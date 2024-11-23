from langchain_core.prompts import ChatPromptTemplate

MARKETSEGMENT_PROMPT = ChatPromptTemplate.from_template(
    """
Analyze the following vision, mission, description, and domain of the startup to create a JSON-format questionnaire schema using this structure:
{{
  "segments": [
    {{
      "segment": "Segment 1",
      "unit_size": "Numerical value and description for unit size",
      "urgency": "Numerical value (1-10) and description for urgency",
      "utilization": "Numerical value (frequency per month/year) and description for utilization",
      "benefit": "Value and description for benefit",
      "segment_income": "Numerical value (e.g., average income or revenue) and description for segment income",
      "potential_one_time_revenue": "Numerical value (in dollars) and description for one-time revenue",
      "potential_continuous_revenue_stream": "Numerical value (in dollars) and description for continuous revenue stream",
      "potential_beachhead": "Value and description for potential beachhead",
      "market_share": "Numerical value (percentage) and description for market share",
      "growth_rate": "Numerical value (percentage) and description for annual growth rate",
      "competition_index": "Numerical value (1-10) indicating competition intensity",
      "customer_acquisition_cost": "Numerical value (in dollars) and description for acquisition cost",
      "lifetime_value": "Numerical value (in dollars) and description for lifetime value",
      "profit_margin": "Numerical value (percentage) and description for profit margin"
    }},
    {{
      "segment": "Segment 2",
      "unit_size": "Numerical value and description for unit size",
      "urgency": "Numerical value (1-10) and description for urgency",
      "utilization": "Numerical value (frequency per month/year) and description for utilization",
      "benefit": "Value and description for benefit",
      "segment_income": "Numerical value (e.g., average income or revenue) and description for segment income",
      "potential_one_time_revenue": "Numerical value (in dollars) and description for one-time revenue",
      "potential_continuous_revenue_stream": "Numerical value (in dollars) and description for continuous revenue stream",
      "potential_beachhead": "Value and description for potential beachhead",
      "market_share": "Numerical value (percentage) and description for market share",
      "growth_rate": "Numerical value (percentage) and description for annual growth rate",
      "competition_index": "Numerical value (1-10) indicating competition intensity",
      "customer_acquisition_cost": "Numerical value (in dollars) and description for acquisition cost",
      "lifetime_value": "Numerical value (in dollars) and description for lifetime value",
      "profit_margin": "Numerical value (percentage) and description for profit margin"
    }}
  ]
}}

Vision content:
{vision}

Mission content:
{mission}

Description content:
{description}

Domain content:
{domain}

Guidelines:
1. **Segment Identification**: Use the information provided to identify distinct customer or market segments relevant to the startup's vision and mission.
2. **Unit Size**: Define the size of each segment, such as the number of potential customers, organizations, or other measurable units, using numerical values where possible.
3. **Urgency**: Assess how critical the segment's needs are in alignment with the startup's offering, assigning a numerical score between 1-10 or a descriptive value.
4. **Utilization**: Estimate how frequently the segment would use the startup's products or services, specifying a numerical value (e.g., occurrences per month or year) or a description.
5. **Benefit**: Explain the primary benefit the segment derives from the startup's product or service.
6. **Segment Income**: Provide an approximation or categorization of the income the startup might expect from this segment using numerical values or ranges.
7. **Potential One-Time Revenue**: Specify revenue opportunities from one-off purchases or services using numerical values (in dollars).
8. **Potential Continuous Revenue Stream**: Highlight revenue opportunities from recurring transactions, subscriptions, or ongoing services with numerical values (in dollars).
9. **Potential Beachhead**: Indicate whether this segment could serve as a strategic entry point or a foundation for further expansion in the market.
10. **Market Share**: Estimate the percentage of the total market that the startup could capture in this segment.
11. **Growth Rate**: Indicate the annual growth rate of this segment in terms of percentage.
12. **Competition Index**: Rate the level of competition in this segment on a scale of 1-10, with 1 being low and 10 being high.
13. **Customer Acquisition Cost**: Estimate the cost of acquiring customers in this segment using numerical values (in dollars).
14. **Lifetime Value**: Provide the estimated revenue generated from a single customer over their lifecycle in numerical terms (in dollars).
15. **Profit Margin**: Estimate the profit margin percentage expected from this segment.
16. **Data-driven Insight**: Use quantitative and qualitative insights wherever possible to substantiate the attributes for each segment.
17. **Consistency**: Ensure the JSON schema is consistent and follows the structure provided without adding or omitting fields.
18. **Clarity**: Use clear, concise, and unambiguous language for all values in the schema.
19. **Alignment with Domain**: Ensure that the segments, benefits, and revenue streams align with the startup's domain and target industry.
20. **Completeness**: Include at least two segments in the schema, ensuring comprehensive coverage of potential market opportunities.
21. **Customization**: Tailor the attributes to reflect specific details from the provided vision, mission, description, and domain.
- Give me atleast 5 segments
"""
)
