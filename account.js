const jsonStructure = {
    username: "",
    email: "",
    chorechat_name: "",
    password: "",
    roomies: [
        {
            name: "",
            number: "",
            current_chore: "garbage",
            chore_complete: "",
            points: 0,
            point_delta: 0
        }
    ],
    chores: {
        weekly: {
            garbage: {
                duties: [
                    "",
                    "",
                    ""
                ],
                supply_notes: [
                    
                ]
            }
        },
        bi_weekly: [],
        monthly: []
    },
    schedule_details: [],
    schedule_function: () => {
        // schedule functionality
    }
}