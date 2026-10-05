param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [string]$OutputPath = "data/imported-guides.ts"
)

$raw = Get-Content -LiteralPath $InputPath -Raw
$declaration = $raw.IndexOf('<?xml')
if ($declaration -lt 0) { throw 'The WordPress XML declaration was not found.' }

$document = New-Object System.Xml.XmlDocument
$document.LoadXml($raw.Substring($declaration))
$namespaces = New-Object System.Xml.XmlNamespaceManager($document.NameTable)
$namespaces.AddNamespace('wp', 'http://wordpress.org/export/1.2/')
$namespaces.AddNamespace('content', 'http://purl.org/rss/1.0/modules/content/')
$namespaces.AddNamespace('excerpt', 'http://wordpress.org/export/1.2/excerpt/')

$relevantCategories = @(
  'الحياة في المانيا', 'الدراسة في المانيا', 'العمل', 'التخصص الطبي',
  'التأشيرة الألمانية', 'الجنسية الألمانية', 'السكن', 'اللغة الألمانية',
  'امتحان اللغة الألمانية', 'التدريب المهني', 'معادلة الشهادات',
  'التقديم للجامعات', 'التخصصات والجامعات', 'اللجوء'
)
$excludedCategories = @('اخبار', 'اسعار العملات', 'رياضة')

function ConvertTo-PlainText([string]$html) {
  if ([string]::IsNullOrWhiteSpace($html)) { return '' }
  $text = [regex]::Replace($html, '(?is)<(script|style)[^>]*>.*?</\1>', '')
  $text = [regex]::Replace($text, '(?i)<br\s*/?>|</p>|</li>|</blockquote>', "`n")
  $text = [regex]::Replace($text, '<[^>]+>', ' ')
  $text = [System.Net.WebUtility]::HtmlDecode($text)
  $text = [regex]::Replace($text, '[\t ]+', ' ')
  $text = [regex]::Replace($text, '(\r?\n\s*){2,}', "`n")
  return $text.Trim()
}

function Get-Sections([string]$html) {
  $headings = [regex]::Matches($html, '(?is)<h[1-6][^>]*>(.*?)</h[1-6]>')
  $sections = [System.Collections.Generic.List[object]]::new()

  if ($headings.Count -eq 0) {
    $plain = ConvertTo-PlainText $html
    $paragraphs = @($plain -split "`n" | Where-Object { $_.Trim().Length -gt 20 })
    $chunkSize = [math]::Max(1, [math]::Ceiling($paragraphs.Count / 3))
    $titles = @('عن الموضوع', 'التفاصيل المهمة', 'ما تحتاج إلى معرفته')
    for ($i = 0; $i -lt $paragraphs.Count; $i += $chunkSize) {
      $end = [math]::Min($i + $chunkSize - 1, $paragraphs.Count - 1)
      $body = ($paragraphs[$i..$end] -join "`n").Trim()
      if ($body) { $sections.Add([ordered]@{ title = $titles[[math]::Min($sections.Count, 2)]; body = $body }) }
    }
  } else {
    $intro = ConvertTo-PlainText $html.Substring(0, $headings[0].Index)
    if ($intro.Length -gt 40) { $sections.Add([ordered]@{ title = 'مقدمة'; body = $intro }) }
    for ($i = 0; $i -lt $headings.Count; $i++) {
      $start = $headings[$i].Index + $headings[$i].Length
      $end = if ($i + 1 -lt $headings.Count) { $headings[$i + 1].Index } else { $html.Length }
      $title = ConvertTo-PlainText $headings[$i].Groups[1].Value
      $body = ConvertTo-PlainText $html.Substring($start, $end - $start)
      if ($title -and $body) { $sections.Add([ordered]@{ title = $title; body = $body }) }
    }
  }

  if ($sections.Count -eq 0) {
    $sections.Add([ordered]@{ title = 'المقال'; body = (ConvertTo-PlainText $html) })
  }
  return @($sections | Select-Object -First 10)
}

function Get-Category([string[]]$categories) {
  if ($categories -contains 'التخصص الطبي') { return 'medicine' }
  if (($categories -contains 'اللغة الألمانية') -or ($categories -contains 'امتحان اللغة الألمانية')) { return 'language' }
  if (($categories -contains 'التأشيرة الألمانية') -or ($categories -contains 'الجنسية الألمانية') -or ($categories -contains 'اللجوء')) { return 'residence' }
  if (($categories -contains 'العمل') -or ($categories -contains 'التدريب المهني')) { return 'work' }
  if ($categories -contains 'الدراسة في المانيا') { return 'study' }
  return 'life'
}

$guides = foreach ($item in $document.SelectNodes('//channel/item')) {
  if ($item.SelectSingleNode('wp:post_type', $namespaces).InnerText -ne 'post') { continue }
  if ($item.SelectSingleNode('wp:status', $namespaces).InnerText -ne 'publish') { continue }

  $categories = @($item.SelectNodes('category[@domain="category"]') | ForEach-Object { $_.InnerText })
  if (@($categories | Where-Object { $excludedCategories -contains $_ }).Count -gt 0) { continue }
  if (@($categories | Where-Object { $relevantCategories -contains $_ }).Count -eq 0) { continue }

  $title = $item.SelectSingleNode('title').InnerText.Trim().TrimEnd(':')
  $html = $item.SelectSingleNode('content:encoded', $namespaces).InnerText
  $plain = ConvertTo-PlainText $html
  $excerpt = $item.SelectSingleNode('excerpt:encoded', $namespaces).InnerText
  $description = ConvertTo-PlainText $excerpt
  if ([string]::IsNullOrWhiteSpace($description)) {
    $description = if ($plain.Length -gt 155) { $plain.Substring(0, 155).TrimEnd() + '…' } else { $plain }
  }
  $wordCount = [regex]::Matches($plain, '[\p{L}\p{N}]+').Count
  $minutes = [math]::Max(3, [math]::Ceiling($wordCount / 200))
  $postId = $item.SelectSingleNode('wp:post_id', $namespaces).InnerText
  $sourceUrl = $item.SelectSingleNode('link').InnerText -replace '^https?://localhost/old_wp', 'https://www.sudaneseingermany.de'

  [ordered]@{
    slug = "article-$postId"
    title = $title
    description = $description
    category = Get-Category $categories
    minutes = $minutes
    sections = @(Get-Sections $html)
    origin = 'wordpress-archive'
    source = [ordered]@{
      label = 'سودانيين في ألمانيا — المقال الأصلي'
      url = $sourceUrl
    }
  }
}

$resolvedOutput = Join-Path (Get-Location) $OutputPath
$json = $guides | ConvertTo-Json -Depth 8
$module = "import type { Guide } from '../lib/types';`n`nexport const importedGuides: Guide[] = $json;`n"
$module | Set-Content -LiteralPath $resolvedOutput -Encoding utf8
Write-Output "Imported $($guides.Count) published, relevant articles to $resolvedOutput"
