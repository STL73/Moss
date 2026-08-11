const PageHeader = ({ eyebrow, title, accent, lead }) => (
    <header className="max-container padding-x pt-16 pb-10">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="font-display text-(length:--text-display) leading-[1.05] mt-4">
            {title} <em className="text-accent italic">{accent}</em>
        </h1>
        {lead && <p className="mt-5 max-w-md text-text-muted leading-relaxed">{lead}</p>}
        <hr className="mt-10 border-border" />
    </header>
);

export default PageHeader;
