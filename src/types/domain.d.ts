interface IColour {
  colourId: number;
  name: string;
  isEnabled: boolean;
}

interface IPerson {
  personId: number;
  firstName: string;
  lastName: string;
  isAuthorised: boolean;
  isEnabled: boolean;
  isValid: boolean;
  favouriteColours: IColour[];
}
