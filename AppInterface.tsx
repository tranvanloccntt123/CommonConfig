export interface baseApiResponseInterface{
    id: number, 
    updated_at?: string
    created_at?: string
}
export interface GroupChatInterface extends baseApiResponseInterface{
    name: string,
    avatar?: string
}
export interface UserInterface extends baseApiResponseInterface{
    name: string,
    avatar?: string
}
export interface GroupChatUserInterface extends baseApiResponseInterface{
    user: UserInterface
    group: GroupChatInterface
    avatar?: string
}
export interface GroupMessageInterface extends baseApiResponseInterface{
    group_message_id: number
    type: string
    content: any
    user: UserInterface
}
export interface PaginateDetailInterface{
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
}
export interface PaginateLinkInterface{
    first: string
    last: string
    prev?: any
    next?: any
}
export interface PaginateInterface{
    data: Array<any>
    pagination: PaginateDetailInterface
    links: PaginateLinkInterface
}
export interface ResponseInterface{
    message: any,
    status: string
}