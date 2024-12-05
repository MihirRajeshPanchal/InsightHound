import { ArticlesApiResponse, CompanyData, CoordinateDataApiResponse, KeywordsResponse, MockResponse, Product, QuestionsData, Segment } from "./api"
import { EmailFormResponse } from "./form"
import { GetHoundBoardResponse } from "./kanban"

export enum RoleEnum {
    USER = "user",
    AI = "ai",
}
export enum ActionEnum {
    QUERY = "query",
    ABOUT = "about", // self company card
    FEED = "feed", // news feed
    RIVAL = "rival", // rival company card
    PRODUCT = "product", // product card
    RESPONSE_MD = "response_md", // response message in markdown
    HEATMAP = "heatmap", // heatmap card
    MAIL_INITIATE = "mail_init", // show mail sending table to insert data
    MAIL = "mail", // mail sending email generated
    LINKEDIN = "linkedin", // linkedin message
    SEGMENTATION = "segmentation", // segmentation card
    QUESTIONNAIRE = "questionnaire", // questionnaire card
    QUESTIONNAIRE_ANALYSIS = "questionnaire_analysis", // questionnaire response charts
    BOARD = "board", // agile board
    REPORT = "report", // report card

}
export type Message =  {
    id: string
    createdAt: Date
} & (
    {
        role: RoleEnum.USER,
        action: ActionEnum.QUERY,
        query: string
    }
    | {
        role: RoleEnum.AI,
    } & AIResponse
)

export type AIResponse =  {
    action: ActionEnum.ABOUT,
    data: CompanyData
} | {
    action: ActionEnum.FEED,
    data: ArticlesApiResponse
} | {
    action: ActionEnum.RIVAL,
    data: CompanyData[]
} | {
    action: ActionEnum.PRODUCT,
    data: Product[]
} | {
    action: ActionEnum.RESPONSE_MD,
    data: string
} | {
    action: ActionEnum.HEATMAP,
    data: {
        coordinates: CoordinateDataApiResponse,
        keywords: KeywordsResponse
        selectedKeyword: string
        selectedRegion: string
    }
} |
{
    action: ActionEnum.MAIL_INITIATE,
} |
 {
    action: ActionEnum.MAIL,
    data: EmailFormResponse
} | {
    action: ActionEnum.LINKEDIN,
    data: string
} | {
    action: ActionEnum.SEGMENTATION,
    data: { segments: Segment[] }
} | {
    action: ActionEnum.QUESTIONNAIRE,
    data: QuestionsData
} | {
    action: ActionEnum.QUESTIONNAIRE_ANALYSIS,
    data: MockResponse
} | {
    action: ActionEnum.BOARD,
    data: GetHoundBoardResponse
} | {
    action: ActionEnum.REPORT,
    data: { html_content: string }
}