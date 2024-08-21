import React from 'react';
import './Skeleton.scss';

interface CreateSkeletonProps {
    span?     : boolean;
    number    : number;
    className?: string;
}

const CreateSkeleton: React.FC<CreateSkeletonProps> = ({ span, number }) => {
	const skeleton = new Array(number).fill(1);
	return (
		<ul className='skeleton'>
			{skeleton.map((_, i) => {
				return (
					<li key={i}>
						{span ? <span /> : null}
					</li>
				);
			})}
		</ul>
	);
};

export default CreateSkeleton;
