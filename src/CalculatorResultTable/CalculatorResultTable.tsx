import React from 'react';
import Calculator, { CalculatorYearDetails, CalculatorFrequencyType } from '../Calculator/Calculator';
import { toCurrency } from '../helpers/tools';
import { strings } from './CalculatorResultTableLocales';
import './CalculatorResultTable.scss';

export default class CalculatorResultTable extends React.Component<CalculatorResultTableProps> {
	//#region Props & state
	public props: CalculatorResultTableProps = {
		frequency: 'week',
		results: [],
		currentLanguage: 'en'
	};
	//#endregion

	public componentWillReceiveProps(nextProps: CalculatorResultTableProps): void {
		strings.setLanguage(nextProps.currentLanguage);
	}

	//#region Render
	public render(): JSX.Element {
		const { currentLanguage } = this.props;

		return (
			<div className="CalculatorResultTable">
				<table className="CalculatorResultTable__table">
					<thead className="CalculatorResultTable__thead">
						<tr className="CalculatorResultTable__tr">
							<th className="CalculatorResultTable__th">{ strings.year }</th>
							{ this.props.frequency !== 'year' ? (
								<th className="CalculatorResultTable__th">{ strings.contribPerYear }</th>
							) : null }
							<th className="CalculatorResultTable__th">{ strings.formatString(strings.contribPer, { term: Calculator.getFrequencyLabel(this.props.frequency) }) }</th>
							<th className="CalculatorResultTable__th">Total</th>
						</tr>
					</thead>

					<tbody className="CalculatorResultTable__tbody">
						{this.props.results.map(result => (
							<tr
								className="CalculatorResultTable__tr"
								key={ result.year }>

								<td className="CalculatorResultTable__td">
									{ result.year + (result.isCurrentYear ? '*' : '') }
								</td>

								{ this.props.frequency !== 'year' ? (
									<td className="CalculatorResultTable__td">
										{ toCurrency(result.contribution, currentLanguage) }
									</td>
								) : null }

								<td className="CalculatorResultTable__td">
									{ toCurrency(result.frequencyContribution, currentLanguage) }
								</td>

								<td className="CalculatorResultTable__td">
									{ toCurrency(result.total, currentLanguage) }
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<em className="small small--faded">{ strings.bottomNote }</em>
			</div>
		);
	}
	//#endregion
}

export interface CalculatorResultTableProps {
	className?: string;
	results: CalculatorYearDetails[];
	frequency: CalculatorFrequencyType;
	currentLanguage: string;
}
