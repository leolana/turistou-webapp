import React from 'react'
import { Skeleton, Table } from 'antd'

const SkeletonTable = ({ isLoading, tableColumns, tableData = [], pagination = false }) => (
  <Skeleton
    loading={isLoading}
    active
    title={false}
    paragraph={{ rows: 6, width: '100%' }}
    className="mt-5"
  >
    <Table
      rowKey="id"
      className="utils__scrollTable"
      scroll={{ x: '100%' }}
      columns={tableColumns}
      dataSource={tableData}
      pagination={pagination}
    />
  </Skeleton>
)

export default SkeletonTable
