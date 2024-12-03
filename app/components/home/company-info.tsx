"use dom"
import "~/global.css"
import { Company } from "~/lib/types/prisma";

interface CompanyCardProps {
    company: Company;
}

const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
    'linear-gradient(135deg, #007adf 0%, #00ecbc 100%)',
];

const CompanyInfo = ({ company }: CompanyCardProps) => {
    const gradient = gradients[Math.floor(Math.random() * gradients.length)];
    return (
        <div
            className="w-full h-full p-6 rounded-2xl shadow-lg text-white"
            style={{ background: gradient }}
        >
            <h2 className="text-2xl font-bold mb-2">{company.name}</h2>
            <p className="text-sm mb-4">{company.description}</p>
            {company.vision && (
                <div className="mb-2">
                    <h3 className="font-semibold">Vision:</h3>
                    <p className="text-sm">{company.vision}</p>
                </div>
            )}
            {company.mission && (
                <div className="mb-2">
                    <h3 className="font-semibold">Mission:</h3>
                    <p className="text-sm">{company.mission}</p>
                </div>
            )}
            {company.valuation && (
                <div className="mb-2">
                    <h3 className="font-semibold">Valuation:</h3>
                    <p className="text-sm">{company.valuation}</p>
                </div>
            )}
            {company.domain && (
                <div>
                    <h3 className="font-semibold">Domain:</h3>
                    <p className="text-sm">{company.domain}</p>
                </div>
            )}
        </div>
    );
}

CompanyInfo.displayName = "CompanyInfo";

export default CompanyInfo;