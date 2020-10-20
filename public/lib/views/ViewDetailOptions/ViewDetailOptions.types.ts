import { RouteConfigComponentProps } from '@redactie/redactie-core';

export interface ViewDetailOptionsProps extends RouteConfigComponentProps {
	onSubmit: (data: any) => void;
}
