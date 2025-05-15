<?php

namespace Modules\DIPH\Services;

use Modules\Core\Facades\DataTable;
use Modules\DIPH\Http\Resources\DIPHResource;
use Modules\DIPH\Models\DIPH;

class DIPHService
{
    public function index(): \Illuminate\Http\Resources\Json\AnonymousResourceCollection{
        $filters = str_replace(
            [
                ''
            ],
            [],
            request()->query('filters')?? []
        );

        $result = DataTable::query(DIPH::query());

        return DIPHResource::collection($result);
    }
}
