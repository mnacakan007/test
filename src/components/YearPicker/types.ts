export interface IYearPicker {
    date        ?: Date | string;
    id           : string;
    showAllYears?: boolean;
    disabled?    : boolean;
    onChangeDate?: () => void;
}

