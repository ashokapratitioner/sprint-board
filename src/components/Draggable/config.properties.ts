const placeholderStyleProperties = ["border", "width", "height"];

export const addStyleProperties = <T>(element: HTMLElement, options: T) => {
  placeholderStyleProperties.forEach((property) => {
    element.style.setProperty(property, "");
  });
};

export const removeStyleProperties = (element: HTMLElement) => {
  placeholderStyleProperties.forEach((property) => {
    element.style.removeProperty(property);
  });
};

export const addAttributes = <T extends Record<string, string>>(
  element: HTMLElement,
  attributes: T
) => {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};
