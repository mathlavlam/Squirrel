import React, { ReactNode } from 'react';
import CalculatorResultTable from '../CalculatorResultTable/CalculatorResultTable';
import { toCurrency, pluralize, generateRdmString } from '../helpers/tools';
import { Moment } from 'moment';
import './Calculator.scss';
const moment = require('moment');

export default class Calculator extends React.Component<any, CalculatorState> {
	public state: CalculatorState = {
		existing: 825,
		contribution: 150,
		frequency: 'week',
		growth: 6,
		years: 35,
		inflationRate: 2,
		currentResult: 0
	};

	public render(): ReactNode {
		const { existing, contribution, growth, years, inflationRate, frequency } = this.state;
		const results = this.calculateGrowth(this.state);

		return (
			<div className="Calculator">
				<form className="Calculator__form">
					<div className="Calculator__input-container">
						<label className="Calculator__input-label">
							J'ai déjà accumulé : 
						</label>

						<input
							className="Calculator__input Calculator__input--existing custom-input custom-input--inline"
							type="number"
							value={ existing }
							onFocus={ this.onInputFocus.bind(this) }
							onChange={ this.onNumberInputChange('existing') } />

						<span className="Calculator__input-unit">$</span>
					</div>

					<div className="Calculator__input-container">
						<label className="Calculator__input-label">
							Je prévois mettre de côté 
						</label>

						<input
							className="Calculator__input Calculator__input--contribution custom-input custom-input--inline"
							type="number"
							value={ contribution }
							step={ 25 }
							onFocus={ this.onInputFocus.bind(this) }
							onChange={ this.onNumberInputChange('contribution') } />

						<span className="Calculator__input-unit">$ à chaque</span>

						<select
							className="Calculator__select Calculator__select--frequency custom-select custom-select--inline"
							value={ frequency }
							onChange={ e => this.setState({frequency: e.currentTarget.value as CalculatorFrequencyType}) }>
							<option value="week">semaine</option>
							<option value="month">mois</option>
							<option value="year">année</option>
						</select>
					</div>

					<div className="Calculator__input-container">
						<label className="Calculator__input-label">
							Je prévois un taux de croissance moyen d'environ : 
						</label>

						<input
							className="Calculator__input Calculator__input--growth custom-input custom-input--inline"
							type="number"
							value={ growth }
							step={0.1}
							onFocus={ this.onInputFocus.bind(this) }
							onChange={ this.onNumberInputChange('growth') } />
						
						<span className="Calculator__input-unit">% par année</span>
					</div>

					<div className="Calculator__input-container">
						<label className="Calculator__input-label">
							J'aimerais savoir le montant que j'aurai accumulé dans :
						</label>

						<input
							className="Calculator__input Calculator__input--years custom-input custom-input--inline"
							type="number"
							value={ years }
							min={0}
							max={100}
							step={5}
							onFocus={ this.onInputFocus.bind(this) }
							onChange={ this.onNumberInputChange('years') } />

						<span className="Calculator__input-unit">{ pluralize(years, 'an', 'ans') }</span>
					</div>

					<div className="Calculator__input-container">
						<label className="Calculator__input-label">
							Je désire indexer mes contributions à un niveau de :
						</label>

						<input
							className="Calculator__input Calculator__input--inflation custom-input custom-input--inline"
							type="number"
							value={ inflationRate }
							step={0.1}
							onFocus={ this.onInputFocus.bind(this) }
							onChange={ this.onNumberInputChange('inflationRate') } />

						<span className="Calculator__input-unit">% par année</span>
					</div>
				</form>

				<div className="Calculator__results">
					<div className="Calculator__result-title-container">
						<p className="Calculator__result-pre-title">En { years } { pluralize(years, 'an', 'ans') }, vous aurez accumulé :</p>
						<h2 className="Calculator__result-title">{ toCurrency(results.total) }</h2>
					</div>
	
					<CalculatorResultTable
						className="Calculator__table"
						frequency={frequency}
						results={results.details} />
				</div>
			</div>
		);
	}

	//#region Private methods
	private onNumberInputChange(stateKey: 'existing'|'contribution'|'growth'|'years'|'inflationRate'): (e: React.FormEvent<HTMLInputElement>) => void {
		return (e: React.FormEvent<HTMLInputElement>) => {
			const newVal: number = +e.currentTarget.value;

			// @ts-ignore
			this.setState({
				[stateKey]: newVal
			});
		};
	}

	private calculateGrowth({ existing = 0, contribution, frequency, growth, years, inflationRate }: CalculateGrowthOptions): CalculatorResults {
		const growthMultiplier: number = 1 + ((+growth || 0) / 100);
		const yearContributions: any[] = [];
		let currentYear: number = new Date().getFullYear();
		let accumulator: number = +existing || 0;

		if (typeof contribution === 'string') {
			contribution = +contribution;
		}

		for (let i: number = 0; i < years; i++) {
			const convertedContribution = this.getContributionPerYear(+contribution || 0, frequency, i === 0);

			accumulator += convertedContribution;
			accumulator *= growthMultiplier;

			yearContributions.push({
				year: currentYear,
				isCurrentYear: i === 0,
				contribution: convertedContribution,
				frequencyContribution: contribution,
				total: accumulator
			});
			contribution *= (1 + ((+inflationRate || 0) / 100));
			currentYear++;
		}

		return {
			total: accumulator,
			details: yearContributions
		};
	}

	private getContributionPerYear(contribution: number, frequency: CalculatorFrequencyType, isCurrentYear: boolean = false): number {
		const today: Moment = isCurrentYear ? moment() : null;

		switch (frequency) {
			case 'week':
				if (isCurrentYear) {
					const currentWeekProgress: number = today.isoWeekday() / 7;
					const remainingWeeks: number = 52 - ((today.week() - 1) + currentWeekProgress);
					return contribution * (52 - remainingWeeks);
				} else {
					return contribution * 52;
				}

			case 'month':
				if (isCurrentYear) {
					const currentMonthProgress: number = today.date() / today.daysInMonth();
					const remainingMonths: number = 12 - ((today.month() - 1) + currentMonthProgress);
					return contribution * remainingMonths;
				} else {
					return contribution * 12;
				}

			case 'year':
			default:
				return contribution * (isCurrentYear ? 1 - (today.dayOfYear() / 365) : 1);
		}
	}

	private onInputFocus(e: React.FocusEvent<HTMLInputElement>): void {
		e.target.select();
	}
	//#endregion

	//#region Public static methods
	public static getFrequencyLabel(frequency: CalculatorFrequencyType): string {
		switch (frequency) {
			case 'week':
				return 'semaine';

			case 'month':
				return 'mois';

			case 'year':
			default:
				return 'année';
		}
	}
	//#endregion
}

export type CalculatorFrequencyType = 'week'|'month'|'year';

export interface CalculatorResults {
	total: number;
	details: CalculatorYearDetails[];
}

export interface CalculatorYearDetails {
	year: number;
	isCurrentYear: boolean;
	contribution: number;
	frequencyContribution: number;
	total: number;
}

export interface CalculatorState {
	contribution: number|string;
	existing: number|string;
	frequency: CalculatorFrequencyType;
	growth: number|string;
	years: number;
	inflationRate: number|string;
	currentResult: number|string;
}

export interface CalculateGrowthOptions extends CalculatorState { };
