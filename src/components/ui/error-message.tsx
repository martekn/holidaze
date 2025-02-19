import { IconExclamationCircleFilled } from "@tabler/icons-react";

type ErrorMessageProps = { children: React.ReactNode };
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <span className="flex gap-4 text-alert-error">
      <IconExclamationCircleFilled className="mt-2 h-20 w-20 shrink-0" />
      <p>{children}</p>
    </span>
  );
};

export { ErrorMessage };
