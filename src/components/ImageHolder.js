import React from 'react';

const ImageHolder = ({ src, onClick }) => {
	return (
		<div>
			<img onClick = {onClick} src={src} alt='Avatar' style={styles.image} />
		</div>
	);
};

const styles = {
	image: {
		width: '25vw',
		height: '25vh',
		objectFit: 'cover' 
	}
}

export default ImageHolder;
