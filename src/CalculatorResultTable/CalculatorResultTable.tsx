import React from 'react';
import Calculator, { CalculatorYearDetails, CalculatorFrequencyType } from '../Calculator/Calculator';
import { toCurrency } from '../helpers/tools';
import './CalculatorResultTable.scss';

export default class CalculatorResultTable extends React.Component<CalculatorResultTableProps> {
	//#region Props & state
	public props: CalculatorResultTableProps = {
		frequency: 'week',
		results: []
	};
	//#endregion

	//#region Render
	public render(): JSX.Element {
		return (
			<div className="CalculatorResultTable">
				<table className="CalculatorResultTable__table">
					<thead className="CalculatorResultTable__thead">
						<tr className="CalculatorResultTable__tr">
							<th className="CalculatorResultTable__th">Année</th>
							{ this.props.frequency !== 'year' ? (
								<th className="CalculatorResultTable__th">Contribution par année</th>
							) : null }
							<th className="CalculatorResultTable__th">Contribution par { Calculator.getFrequencyLabel(this.props.frequency) }</th>
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
										{ toCurrency(result.contribution) }
									</td>
								) : null }

								<td className="CalculatorResultTable__td">
									{ toCurrency(result.frequencyContribution) }
								</td>

								<td className="CalculatorResultTable__td">
									{ toCurrency(result.total) }
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<em className="small small--faded">* Les contributions de l'année en cours sont comptées à partir d'aujourd'hui jusqu'à la fin de l'année. Il est donc normale que les contributions de l'année en cours soient plus basses que les autres années.</em>
			</div>
		);
	}
	//#endregion
}

export interface CalculatorResultTableProps {
	className?: string;
	results: CalculatorYearDetails[];
	frequency: CalculatorFrequencyType;
}
