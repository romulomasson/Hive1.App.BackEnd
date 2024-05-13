export type Return<T> =
    | { flagErro: false, listaMensagens: any[], listaResultados: T[] | T }
    | { flagErro: true, listaMensagens: any[], listaResultados: any[] | any }

