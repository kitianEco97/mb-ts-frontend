export class File {
    id?: number;
    proyecto?: string;
    cliente?: string;
    tipohormigon?: string;
    numeromuestra?: number;
    volumen?: number;
    nhp?: number;

    // DISEÑO
    marca?: number;
    abs?: number;
    lote?: number;
    pesoseco?: number;
    pesosecobatch?: number;
    humedad?: number;
    agua?: number;
    pesohumedo?: number;

    constructor(proyecto: string, cliente: string, tipohormigon: string, numeromuestra: number, volumen: number, nhp: number,
        marca: number, abs: number, lote: number, pesoseco: number, pesosecobatch: number, humedad: number, agua: number, pesohumedo: number) {
        this.proyecto = proyecto;
        this.cliente = cliente;
        this.tipohormigon = tipohormigon;
        this.numeromuestra = numeromuestra;
        this.volumen = volumen;
        this.nhp = nhp;

        this.marca = marca;
        this.abs = abs;
        this.lote = lote;
        this.pesoseco = pesoseco;
        this.pesosecobatch = pesosecobatch;
        this.humedad = humedad;
        this.agua = agua;
        this.pesohumedo = pesohumedo;
    }

    
}