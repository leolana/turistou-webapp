import React, { useMemo } from 'react'
import { Skeleton, Table } from 'antd'

const SkeletonTable = ({
  isLoading,
  tableColumns,
  actionsColumn,
  tableData = [],
  pagination = false,
}) => {
  const columns = useMemo(
    () => (actionsColumn ? [...tableColumns, actionsColumn] : tableColumns),
    [tableColumns, actionsColumn],
  )

  return (
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
        columns={columns}
        dataSource={tableData}
        pagination={pagination}
      />
    </Skeleton>
  )
}

export default SkeletonTable
