import {Button, Container, Stack} from 'react-bootstrap';

export default function Blueprint(props: { blocks: any[], components: any[] }) {
	return (
		<Container>
			<Button href={`/#/`} className="mb-3 mx-2">Back</Button>
			<Stack direction="vertical" gap={4}>
				<Stack direction="horizontal" gap={3}>
					<div>Blueprint</div>
				</Stack>
			</Stack>
		</Container>
	);
}
