interface HProps {
  children: React.ReactNode;
}

export const H1 = ({ children }: HProps) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
};

export const H2 = ({ children }: HProps) => {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
};

export const H3 = ({ children }: HProps) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};

export const H4 = ({ children }: HProps) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
};

export const P = ({ children }: HProps) => {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
};

export function Blockquote({ children }: HProps) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}
