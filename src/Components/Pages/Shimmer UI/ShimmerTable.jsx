import React from 'react';
import styled, { keyframes } from 'styled-components';

// Shimmer animation
const shimmer = keyframes`
  100% {
    left: 100%;
  }
`;

const ShimmerCell = styled.div`
  width: 100%;
  height: 40px;
  background-color: #e0e0e0;
  position: relative;
  overflow: hidden;
  margin: 0 8px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.2) 100%);
    animation: ${shimmer} 1.5s infinite;
  }
`;

const ShimmerRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const ShimmerTable = ({ numRows = 5, numColumns = 7 }) => {
  return (
    <div className="w-full">
      {/* Table Header Shimmer */}
      <div className="bg-gray-200 rounded-md mb-4">
        <ShimmerRow>
          {Array.from({ length: numColumns }).map((_, index) => (
            <ShimmerCell key={index} />
          ))}
        </ShimmerRow>
      </div>

      {/* Table Body Shimmer Rows */}
      {Array.from({ length: numRows }).map((_, rowIndex) => (
        <div key={rowIndex} className="bg-gray-100 rounded-md mb-3">
          <ShimmerRow>
            {Array.from({ length: numColumns }).map((_, cellIndex) => (
              <ShimmerCell key={cellIndex} />
            ))}
          </ShimmerRow>
        </div>
      ))}
    </div>
  );
};

export default ShimmerTable;
