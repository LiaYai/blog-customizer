import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';

export const ArticleParamsForm = () => {
	const [state, setState] = useState(defaultArticleState);
	console.log(state);
	const handleChange = (option: OptionType) => {
		setState({ ...state, fontSizeOption: option });
	};

	return (
		<>
			<ArrowButton isOpen={true} onClick={() => {}} />
			<aside className={clsx(styles.container, styles.container_open)}>
				<form className={styles.form}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select selected={null} options={fontFamilyOptions} title='Шрифт' />
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={defaultArticleState.fontSizeOption}
						title={'Размер шрифта'}
						onChange={handleChange}
					/>
					<Select selected={null} options={fontColors} title='Цвет шрифта' />
					<Separator />
					<Select
						selected={null}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={null}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
