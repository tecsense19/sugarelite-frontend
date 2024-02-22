export const profile_select_options_appearance = [
    {
        options: ["Male", "Female", "Others"],
        name: "sex",
        text: "sex"
    },
    {
        options: ["African", "Arabian", "Asian", "Caucasian (White)", "Indian", "Latin", "Mixed", "Others"],
        name: "ethnicity",
        text: "ethnicity"
    },
    {
        options: ["Athletic", "Chubby"],
        name: "body_structure",
        text: "body structure"
    },
    {
        options: [""],
        name: "piercings",
        text: "piercings"
    },
    {
        options: Array.from({ length: 120 }).map((_, inx) => inx + 120),
        name: "height",
        text: "height (cm.)"
    },
    {
        options: [""],
        name: "civil_status",
        text: "civil status"
    },
    {
        options: [""],
        name: "hair_color",
        text: "hair color"
    },
    {
        options: [""],
        name: "tattos",
        text: "tattos"
    },
    {
        options: Array.from({ length: 80 }).map((_, inx) => inx + 40),
        name: "weight",
        text: "weight (kg.)"
    }
]
export const profile_select_options_lifestyle = [
    {
        options: ["Bachelor's degree", "Graduate degree", "Primary school",
            "High school diploma", "Longer further", "Ph.D", "Shorter secondary school", "Vocational education", "NO"],
        name: "education",
        text: "education"
    },
    {
        options: ["Tit", "Sometimes", "On festive occasions", "Rarely", "No"],
        name: "smoking",
        text: "smoking habits"
    },
    {
        options: [
            "Administration, management and HR", "Art/music/design", "Agriculture/forestry/fishing",
            "Master apprentice/craftsman",
            "Engineering",
            "Media and entertainment",
            "Construction",
            'Finance',
            "Medicine/health care", "IT/Computers Language", "writer", "journalism Legal/audit",
            "Maritime",
            "Marketing/Sales",
            "Trade and office", "Pedagogue", "History/philosophy",
            'Science',
            "Restoration",
            "Student", "Teacher/academics", "Hotel/Tourism", "Other things"],
        name: "employment",
        text: "employment"
    },
    {
        options: ["Tit", "Sometimes", "On festive occasions", "Rarely", "No"],
        name: "drinking",
        text: "drinking habits"
    },
]