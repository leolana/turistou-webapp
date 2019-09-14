import React from 'react'
import { Skeleton } from 'antd'

const SkeletonForm = ({ isLoading, rows = 2, children }) => (
  <Skeleton
    loading={isLoading}
    active
    title={false}
    paragraph={{ rows, width: '100%' }}
    className="mt-5"
  >
    {children}
  </Skeleton>
)

export default SkeletonForm
