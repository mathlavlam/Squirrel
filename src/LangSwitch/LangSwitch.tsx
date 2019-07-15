import React from 'react';
import './LangSwitch.scss'
import { LocalizedStrings } from 'react-localization';

export default class LangSwitch extends React.Component<LangSwitchProps, LangSwitchState> {
	//#region Props & state
	public state: LangSwitchState = {
		currentLanguage: this.props.localeStrings.getLanguage()
	};
	//#endregion

	//#region Render
	public render(): JSX.Element {
		const languages: string[] = this.props.localeStrings.getAvailableLanguages();
		const { currentLanguage: current } = this.state;

		return (
			<div className={`LangSwitch ${ this.props.className }`}>
				<ul className="LangSwitch__list">
					{ languages.map(lang => (
						<li
							key={ lang }
							className={ 'LangSwitch__item' + (lang === current ? ' LangSwitch__item--current' : '') }>
							<button
								type="button"
								className="LangSwitch__item-btn"
								onClick={ this.onLangClick.bind(this, lang) }>
								{ lang }
							</button>
						</li>
					)) }
				</ul>
			</div>
		);
	}
	//#endregion

	//#region Private methods
	private onLangClick(val: string): void {
		this.props.localeStrings.setLanguage(val);
		this.setState({ currentLanguage: val });
		if (this.props.onChange) {
			this.props.onChange(val);
		}
	}
	//#endregion
}

export interface LangSwitchProps {
	className?: string;
	onChange?: (lang: string) => any;
	localeStrings: LocalizedStrings<any>;
}

export interface LangSwitchState {
	currentLanguage: string;
}
