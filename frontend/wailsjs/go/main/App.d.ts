// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {database} from '../models';
import {main} from '../models';

export function AskForBookImage():Promise<string>;

export function AskForBookPDF():Promise<string>;

export function CheckBookExist(arg1:string):Promise<boolean>;

export function CreateBook(arg1:string,arg2:string,arg3:string):Promise<number>;

export function GetBook(arg1:number):Promise<database.Book>;

export function GetBookPDFData(arg1:number):Promise<string>;

export function GetBooksCount():Promise<number>;

export function GetHomeBooks():Promise<main.HomeBooksData>;

export function GetLibrary():Promise<Array<database.Book>>;

export function OpenImage(arg1:string):Promise<Array<number>>;

export function UpdateLastReaded(arg1:number):Promise<void>;

export function UpdateProgress(arg1:number,arg2:number):Promise<void>;
