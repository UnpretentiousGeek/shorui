export interface User {
    id: string
    email: string
    full_name?: string
    created_at: string
    updated_at: string
}

export interface Resume {
    id: string
    user_id: string
    title: string
    created_at: string
    updated_at: string
}

export interface Branch {
    id: string
    resume_id: string
    name: string
    description?: string
    parent_branch_id?: string
    is_main: boolean
    created_at: string
    updated_at: string
}

export interface Commit {
    id: string
    branch_id: string
    message: string
    author_id?: string
    created_at: string
}

export interface Block {
    id: string
    commit_id: string
    parent_id?: string
    type: string
    order_index: number

    // Layout
    direction: 'horizontal' | 'vertical'
    spacing: number
    padding_top: number
    padding_right: number
    padding_bottom: number
    padding_left: number
    alignment: 'start' | 'center' | 'end'

    // Content
    content: Record<string, any>

    // Text styling
    font_family?: string
    font_size?: number
    font_weight?: string
    text_color?: string
    text_align?: string
    text_decoration?: string

    created_at: string
    updated_at: string
}

export interface Export {
    id: string
    branch_id: string
    commit_id: string
    format: 'pdf' | 'docx'
    file_url?: string
    created_at: string
}
