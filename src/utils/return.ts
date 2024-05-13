import { Return } from '../interfaces/ApiReturn'
import { AbstractException } from './errors/AbstractException'

export function sendError(error: unknown): Return<any> {

    const Return: Return<any> = {
        flagErro: true,
        listaMensagens: [],
        listaResultados: []
    }

    Return.listaMensagens = error instanceof Error || error instanceof AbstractException ? [error.message] : [error]
    return Return

}

export function sendSuccess<T>(result: T[] | T): Return<T> {

    const Return: Return<T> = {
        flagErro: false,
        listaMensagens: [],
        listaResultados: result
    }

    return Return

}
