<?php

namespace Modules\DIPH\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Modules\IAM\Http\Resources\UserResource;
use Modules\IAM\Models\User;

class ProviderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        $user = User::where('id', $this->user_id)->first();

        return [
            'id'=>$this->id,
            'user_id'=>$this->user_id,
            'full_name'=>$user?->full_name ?? null,
        ];
    }
}
