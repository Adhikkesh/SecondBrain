export type sizes = "sm" | "md" | "lg";
export const Size: Record<sizes,string> = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8"
}
export interface IconType{
    size?: sizes;
}