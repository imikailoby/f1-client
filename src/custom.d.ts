declare module '*.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}


declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
