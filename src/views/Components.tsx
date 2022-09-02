import {Button, Container, Stack} from 'react-bootstrap';

export default function Components(props: { components: any[] }) {
	return (
		<Container>
			<Button href={`/#/`} className="mb-3 mx-2">Back</Button>
			<Stack direction="vertical" gap={4}>
				<Stack direction="horizontal" gap={3}>
					<div>Components</div>
				</Stack>
			</Stack>
		</Container>
	);
}
