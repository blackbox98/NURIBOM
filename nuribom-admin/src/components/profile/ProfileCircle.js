import React from "react";
import styled from "styled-components";

const ProfileImageWrapper = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0px 0px 0px 0px;
  @media screen and (max-width: 500px) {
    width: 2rem;
    height: 2rem;
  }
`;
ProfileImageWrapper.defaultProps = {
  width: 60,
  height: 60,
};
const ProfileImageThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
`;

const ProfileCircle = ({ imageId, openModal, width, height }) => {
  return (
    <div onClick={openModal}>
      <ProfileImageWrapper width={width} height={height}>
        <ProfileImageThumbnail
          src={`${process.env.PUBLIC_URL}/assets/profileImages/profile${imageId}.jpg`}
        />
      </ProfileImageWrapper>
    </div>
  );
};

export default ProfileCircle;
