import mongoose from "mongoose";
const NoteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subNotes: {
            type: [
                {
                    subNoteTitle: {
                        type: String,
                        default: "",
                    },
                    subNoteAmount: {
                        type: Number,
                        default: 0,
                    },
                    status: {
                        type: Boolean,
                        default: false
                    }
                },
            ],
        }
    },
    {
        timestamps: true,
    }
);
const Notes = mongoose.model("Note", NoteSchema)
export default Notes