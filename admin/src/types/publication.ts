export type PublicationType = 'Kirtan' | 'Katha' | 'Book' | 'Wallpaper';

export interface Publication {
    id: string;
    _id: string;
    Publication: PublicationType;
    PublicationName: string;
    Description: string;
    PublicationDate: string;
    Img: string;
    Link: string;
    pdfUrl?: string;

}


