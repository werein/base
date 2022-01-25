import { PropsWithChildren } from "react";

export default function Button(
  props: PropsWithChildren<{ onClick?: () => void }>
) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
