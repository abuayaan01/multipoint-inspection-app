import React from 'react'
import { Spinner } from '@chakra-ui/react'

function SaveButton({loading}) {
  return (
    <div className="py-5 mx-3">
        <button
          type="submit"
          className="bg-green-400 text-white px-5 py-1 rounded w-[120px]"
        >
          {loading ? <Spinner size={'sm'} /> : 'Save'}
        </button>
      </div>
  )
}

export default SaveButton