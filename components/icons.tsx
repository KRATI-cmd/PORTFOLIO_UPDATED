import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Icon>
  );
}

export function Menu(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </Icon>
  );
}

export function Close(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </Icon>
  );
}

export function Plus(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Icon>
  );
}

export function Mail(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7.5 7.2 5.1a2.2 2.2 0 0 0 2.6 0l7.2-5.1" />
    </Icon>
  );
}

export function Github(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </Icon>
  );
}

export function Linkedin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A5.9 5.9 0 0 1 16 8z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </Icon>
  );
}

export function DevTo(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" />
      <path d="M6.4 9.4v5.2h1a1.3 1.3 0 0 0 1.3-1.3v-2.6a1.3 1.3 0 0 0-1.3-1.3z" />
      <path d="M11.8 9.4 13 14.6l1.2-5.2" />
      <path d="M19.4 9.4h-2.2v5.2h2.2m-2.2-2.6h1.7" />
    </Icon>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 20.5l1.8-5.2A8.5 8.5 0 1 1 21 11.5z" />
      <path d="M9 9.2c.3-.7.6-.7.9-.7h.6c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.5l-.4.5a.3.3 0 0 0 0 .4 6 6 0 0 0 2.6 2.2.3.3 0 0 0 .4-.1l.5-.6c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4a1.8 1.8 0 0 1-1.7 1.7 7 7 0 0 1-5.4-3.4c-.8-1.2-1.4-2.7-1.1-3.7z" />
    </Icon>
  );
}

export function MapPin(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 10.5c0 5.2-8 12-8 12s-8-6.8-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10.3" r="2.8" />
    </Icon>
  );
}

export function Document(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </Icon>
  );
}

export function Terminal(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m5 8 3.5 3.5L5 15" />
      <path d="M12 16h7" />
    </Icon>
  );
}

export function Server(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </Icon>
  );
}

export function Database(props: IconProps) {
  return (
    <Icon {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3.2" />
      <path d="M4 6v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6" />
      <path d="M4 12v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-6" />
    </Icon>
  );
}

export function Layers(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m12 3 9 4.8-9 4.8-9-4.8z" />
      <path d="m3 12.4 9 4.8 9-4.8" />
      <path d="m3 17 9 4.8 9-4.8" />
    </Icon>
  );
}

export function Cloud(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M17.5 19H7a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 10.4a4.3 4.3 0 0 1-.5 8.6z" />
    </Icon>
  );
}

export function Spark(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 13.8 9 19 10.8 13.8 12.6 12 18.1 10.2 12.6 5 10.8 10.2 9z" />
    </Icon>
  );
}

export function Check(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Icon>
  );
}
