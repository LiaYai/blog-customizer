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
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export type ArticleParamsFormProps = {
	onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onChange } = props;

	/** Открытие и закрытие формы **/
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	/** Установка состояния **/
	const [state, setState] = useState(defaultArticleState);

	const handleOnChange =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: option }));
		};

	const handleReset = () => {
		setState(defaultArticleState);
		onChange(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onChange(state);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title={'Размер шрифта'}
						onChange={handleOnChange('fontSizeOption')}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleOnChange('backgroundColor')}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleOnChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
