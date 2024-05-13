export interface SignUpStepBody {
    name: string;
    email: string;
    password: string;
    token?: string;
}

export interface PersonalInfoStepBody {
    id: number
    avatar: string
    name: string
    CPF: string
    nickname: string
    genre: 'M' | 'F' | 'O'
    birthDay: string
    CEP: string
    address: string
    number: string
    complement: string
    state: string
    city: string
    cellphone: string
    telephone: string
}
