import md5 from "blueimp-md5";

export function getGravatarUrl(person: IPerson, size = 80): string {
  const { firstName, lastName } = person;

  const digest = md5(`${firstName}.${lastName}@gmail.com`);

  const $default = "robohash"; // default is a reserved keyword in js

  return `https://www.gravatar.com/avatar/${digest}?s=${size}&d=${$default}`;
}

export function getComputedColour(colour: IColour): string | null {
  const dummy = document.createElement("div");
  dummy.style.backgroundColor = colour.name;

  document.body.appendChild(dummy);

  const computedColour = getComputedStyle(dummy).backgroundColor;

  dummy.remove();

  if (
    !computedColour ||
    (computedColour.includes("(0, 0, 0") && colour.name.toLowerCase() !== "black")
  ) {
    return null;
  }

  return computedColour;
}
