
import { contentRepository } from '@/lib/content';
import { AssociationBrowser } from '@/components/associations/association-browser';
export default async function Home() {
  const guides = await contentRepository.listGuides();
  return (
    <>
     
      <section
        id="associations"
        className="shell home-associations"
        aria-labelledby="associations-title"
      >
        <div className="section-heading">
          <div>
               <span className="eyebrow"> مجتمعين نقف</span>
            <h2> الجمعيات السودانية في المانيا </h2>
            <p id="associations-title">
              تعرّف على الجمعيات السودانية الألمانية، وابحث حسب المنطقة.
            </p>
          </div>
        </div>
        <AssociationBrowser />
      </section>
    </>
  );
}
