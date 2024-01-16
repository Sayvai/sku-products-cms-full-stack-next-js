import { ModeToggle } from "../mode-toggle/mode-toggle";

export default function header() {
  return (
    <header className="flex flex-row justify-end p-1">
      <ModeToggle />
    </header>
  );
}
