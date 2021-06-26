// eslint-disable-line
export class UserDto {
  constructor(model) {
    this.email = model.email;
    this.id = model._id; // eslint-disable-line no-underscore-dangle
    this.isActivated = model.isActivated;
  }
}
