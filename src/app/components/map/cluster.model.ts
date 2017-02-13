export interface Cluster {
    markers: string;
    address_id: string;
    price: {
        raw: string;
    };
    coordinates: {
        lat: number;
        lng: number;
    };
}