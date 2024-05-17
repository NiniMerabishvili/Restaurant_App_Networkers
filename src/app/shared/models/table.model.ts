export interface Table{
    id:string;
    number:string,
    capacity:string,
    type:string
}

export interface BookingTable extends Table {
    unavailable: boolean
}