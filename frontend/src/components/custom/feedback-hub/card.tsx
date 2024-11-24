import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { QuestionsData } from '@/lib/types/api'

export default function QuestionnaireCard({ questions }: QuestionsData) {
    return (
        <Card className="w-full max-w-6xl mx-auto bg-gradient-to-br from-purple-50 to-indigo-100 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-3xl font-bold text-center">User Interview Questionnaire</CardTitle>
            </CardHeader>
            <CardContent className="p-6 gap-4 grid grid-cols-1">
                {questions.map((question, index) => (
                    <motion.div
                        key={index}
                        className="space-y-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <h3 className="text-xl font-semibold text-indigo-800">{index + 1}. {question.questionText}</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {question.questionOptions.map((option, optionIndex) => (
                                <motion.li
                                    key={optionIndex}
                                    className="bg-white p-3 rounded-lg cursor-pointer shadow-md text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {option}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </CardContent>
        </Card>
    )
}

