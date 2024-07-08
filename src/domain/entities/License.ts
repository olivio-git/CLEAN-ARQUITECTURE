export class License {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public startDate: Date,
    public endDate: Date,
    public statusLicense: boolean,
    public idUser: string
  ) {}
}
