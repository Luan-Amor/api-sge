

export class Messages {

    static TOKEN_EXPIRED_ERROR = 'Token expirado';
    static TOKEN_INVALID = 'Token Inválido';

    static OPERATION_INVALID = 'Não foi possível concluir a operação.';
    static USER_NOT_FOUND = 'Não foi possível encontrar o usuário informado';
    static EVENT_NOT_FOUND = 'Não foi possível encontrar o evento informado';
    static VIDEO_NOT_FOUND = 'Não foi possível encontrar o vídeo informado';



    static getMessage(message:string, str: string): string {
        return message.replace('{}', str);
    }
}