import type {
  ButtonHTMLAttributes,
  ReactNode
} from "react";

// Botón reutilizable.
// "variant" permite cambiar el estilo del botón.
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  children: ReactNode;
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {

  let buttonStyle = "";

  if (variant === "primary") {
    buttonStyle = "bg-indigo-600 text-white hover:bg-indigo-700";
  }

  if (variant === "secondary") {
    buttonStyle = "bg-slate-100 text-slate-800 hover:bg-slate-200";
  }

  if (variant === "ghost") {
    buttonStyle = "text-slate-600 hover:bg-slate-100";
  }

  if (variant === "danger") {
    buttonStyle = "bg-rose-50 text-rose-700 hover:bg-rose-100";
  }

  return (
    <button
      className={
        "rounded-xl px-4 py-2.5 text-sm font-semibold " +
        "transition disabled:cursor-not-allowed disabled:opacity-50 " +
        buttonStyle +
        " " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}

// Tarjeta general que podemos reutilizar en varias páginas.
export function Card({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={
        "rounded-2xl border border-slate-200 bg-white shadow-panel " +
        className
      }
    >
      {children}
    </section>
  );
}

// Etiqueta pequeña para mostrar estados.
export function Badge({
  children,
  tone = "slate"
}: {
  children: ReactNode;
  tone?: "green" | "amber" | "red" | "blue" | "slate";
}) {
  let color = "bg-slate-100 text-slate-600";

  if (tone === "green") {
    color = "bg-emerald-50 text-emerald-700";
  }

  if (tone === "amber") {
    color = "bg-amber-50 text-amber-700";
  }

  if (tone === "red") {
    color = "bg-rose-50 text-rose-700";
  }

  if (tone === "blue") {
    color = "bg-indigo-50 text-indigo-700";
  }

  return (
    <span
      className={
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold " +
        color
      }
    >
      {children}
    </span>
  );
}

// Título que se utiliza en las diferentes páginas.
export function PageTitle({
  title,
  description,
  action
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={
        "mb-7 flex flex-col gap-4 sm:flex-row " +
        "sm:items-end sm:justify-between"
      }
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}
